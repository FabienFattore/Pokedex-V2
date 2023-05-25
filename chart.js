const ctx = document.getElementById('myChart');


new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Hp', 'Attack', 'Defense', 'Spécial Attack', 'Spécial Défense', 'Speed'],
        datasets: [{
            label: 'Pokestats',
            data: [],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true
            }
        }
    }
})

function drawChart(pokemon) {
    const stats = pokemon.stats
    const chart = Chart.getChart('myChart')
    chart.data.datasets[0].data = stats.map(stat => stat.base_stat)
    chart.update()
    console.log(chart);
}
