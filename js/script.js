document.addEventListener('DOMContentLoaded', () => {

    /**
     * Widget: Gráfico de Habilidades (Chart.js)
     */
    const createSkillsChart = () => {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        
        const skillsData = {
            labels: ['HTML', 'CSS', 'Javascript', 'Python', 'Pandas', 'Power BI', 'PostgreSQL', 'Git', 'Looker (Data Studio)', 'Tableau'],
            datasets: [{
                label: 'Nível de Proficiência',
                data: [100, 100, 80, 90, 90, 75, 85, 70, 100, 100],
                backgroundColor: 'rgba(66, 153, 225, 0.6)',
                borderColor: 'rgba(66, 153, 225, 1)',
                borderWidth: 1
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: skillsData,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#a0aec0' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    },
                    y: {
                        ticks: { 
                            color: '#e2e8f0', 
                            font: { size: 12 },
                            autoSkip: false,
                            callback: function(value) {
                                const label = this.getLabelForValue(value);
                                return label.length > 15 ? label.split(' ').join('\n') : label;
                            }
                        },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    };

    /**
     * Widget: Projetos do GitHub
     */
    const fetchGitHubProjects = async () => {
        const username = 'm4ik-crtl';
        const projectsList = document.getElementById('projects-list');
        const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;
    
        // 🔥 Lista de repositórios que você quer mostrar
        const allowedProjects = [
            "Gym-Churn-Analysis-",
            "trending-by-time",
            "Analise-de-Comportamento-de-Usuarios-e-Teste-A-A-B",
            "alertas_appscript",
            "vehicle-sales-analysis",
            "Tomada-de-Decis-o-Baseada-em-Dados-Prioriza-o-de-Hip-teses-e-Teste-A-B",
            "alerta_googleforms_",
            "E-Commerce-Identificacao-de-Perfis-de-Consumidores",
            "recommerder_system",
            "Analise-de-Livros-e-Avaliacoes-com-SQL"
        ];
    
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            const repos = await response.json();
    
            // Filtra apenas os projetos da lista
            const filteredRepos = repos.filter(
                repo => allowedProjects.includes(repo.name)
            );
    
            let projectsHTML = '';
            if (filteredRepos.length > 0) {
                filteredRepos.forEach(repo => {
                    projectsHTML += `
                        <div class="project-card">
                            <h3>${repo.name}</h3>
                            <p>${repo.description}</p>
                            <a href="${repo.html_url}" target="_blank">
                                Ver no GitHub <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    `;
                });
            } else {
                projectsHTML = '<p>Nenhum projeto da lista foi encontrado.</p>';
            }
            
            projectsList.innerHTML = projectsHTML;
    
        } catch (error) {
            console.error('Falha ao buscar projetos do GitHub:', error);
            projectsList.innerHTML = '<p>Não foi possível carregar os projetos. Tente novamente mais tarde.</p>';
        }
    };   

    createSkillsChart();
    fetchGitHubProjects();
});
