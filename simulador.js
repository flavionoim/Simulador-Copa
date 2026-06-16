function avancarFase(faseAtual, proximaPagina) {
    const inputs = document.querySelectorAll('.placar');
    
    
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("⚠️ Por favor, preencha todos os placares antes de avançar para a próxima fase!");
            return; 
        }
    }

    let vencedores = [];

    
    for (let i = 0; i < inputs.length; i += 2) {
        const time1 = inputs[i].getAttribute('data-time');
        const time2 = inputs[i + 1].getAttribute('data-time');
        const gols1 = parseInt(inputs[i].value);
        const gols2 = parseInt(inputs[i + 1].value);

        
        if (gols1 === gols2) {
            alert(`⚠️ O jogo entre ${time1} e ${time2} terminou empatado! No mata-mata não há empates (adicione os gols dos pênaltis no placar).`);
            return; 
        }

        if (gols1 > gols2) {
            vencedores.push(time1);
        } else {
            vencedores.push(time2);
        }
    }

    localStorage.setItem(faseAtual, JSON.stringify(vencedores));
    window.location.href = proximaPagina;
}

function carregarFase(faseAnterior, slotsClasse) {
    const classificados = JSON.parse(localStorage.getItem(faseAnterior));
    if (!classificados) return;

    const slots = document.querySelectorAll(slotsClasse);
    slots.forEach((slot, index) => {
        if (classificados[index]) {
            slot.textContent = classificados[index];
            const inputCorrespondente = slot.parentElement.querySelector('.placar');
            if (inputCorrespondente) {
                inputCorrespondente.setAttribute('data-time', classificados[index]);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const corpoId = document.body.id;
    
    if (corpoId === "oitavas") {
        
        carregarFase('grupos', '.nome-time');
    }
    else if (corpoId === "quartas") {
        carregarFase('oitavas', '.nome-time');
    }
    else if (corpoId === "semifinais") {
        carregarFase('quartas', '.nome-time');
    }
    else if (corpoId === "final") {
        carregarFase('semifinais', '.nome-time');
    }
});

function avancarFaseGrupos() {
    const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const classificados = {};

    const todosInputs = document.querySelectorAll('.pontos');
    
    
    for (let i = 0; i < todosInputs.length; i++) {
        if (todosInputs[i].value === "") {
            alert("⚠️ Por favor, preencha a pontuação de TODAS as seleções antes de ir para as Oitavas!");
            return;
        }
    }

    grupos.forEach(grupo => {
        const inputs = document.querySelectorAll(`.pontos[data-grupo="${grupo}"]`);
        let times = [];
        
        inputs.forEach(input => {
            times.push({
                nome: input.getAttribute('data-time'),
                pontos: parseInt(input.value)
            });
        });

        
        times.sort((a, b) => b.pontos - a.pontos);

        classificados[`1${grupo}`] = times[0].nome;
        classificados[`2${grupo}`] = times[1].nome;
    });

    const oitavas = [
        classificados['1A'], classificados['2B'],
        classificados['1C'], classificados['2D'],
        classificados['1E'], classificados['2F'],
        classificados['1G'], classificados['2H'],
        classificados['1B'], classificados['2A'],
        classificados['1D'], classificados['2C'],
        classificados['1F'], classificados['2E'],
        classificados['1H'], classificados['2G']
    ];

    localStorage.setItem('grupos', JSON.stringify(oitavas));
    window.location.href = '../Oitavas/oitavas.html';
}