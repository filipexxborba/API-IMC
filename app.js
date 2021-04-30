const express = require('express');
const app = express();
const port = 8080;



app.get('/api', (req, res) => {
    res.json('Você está conectado');
});

app.get('/api/imc/:height/:weight', (req, res) => {
    let height = parseInt(req.params.height);
    height = height * height;
    const weight = parseInt(req.params.weight);
    let result = (weight / height) * 10000;
    
    function calcIMC(result){
        if(result < 18.5) return 'Abaixo do peso';
        if(result >= 18.5 && result < 24.9) return 'Peso normal';
        if(result >= 24.9 && result < 30) return 'Sobrepeso';
        if(result >= 30 && result < 35) return 'Obesidade grau I';
        if(result >= 35 && result < 40) return 'Obesidade grau II';
        if(result >= 40) return 'Obesidade grau III';
    }

    const data = {"height": height, "weight": weight, "result": result, "class" : calcIMC(result)}
    
    res.status(200).json(data);
});

app.use(express.json);
app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`));





