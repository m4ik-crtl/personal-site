const descricao = `Hello! My name is Maikon — I'm a Technician in Systems Analysis and Development, with a strong focus on Web Design and data automation. 
I'm passionate about building efficient and smart solutions, especially using Make (Integromat) to automate processes in ERPs like Odoo, and integrating tools like Excel and Power BI for dynamic data analysis and reporting.
I’ve also been working on data analytics projects using Python and Pandas — including hypothesis testing, customer behavior analysis, and report optimization.
Feel free to check out my resume and explore some of the projects I've been working on!`;

const target = document.getElementById('descricao');
let index = 0;

function typeWriter() {
    if (index < descricao.length) {
        target.innerHTML += descricao.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});
