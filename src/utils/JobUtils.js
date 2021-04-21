module.exports = {
    // Cálculo de dias restantes
    remainingDays(job) {
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // toFixed() arredonda numeros flutuantes para inteiros

        const createdDate = new Date(job.createdAt) // Constante que armazena a data de criação do projeto
        const dueDay = createdDate.getDate() + Number(remainingDays) // Calcula quando será o dia de entrega
        const dueDate = createdDate.setDate(dueDay) // Define a data de entrega

        const timeDiffInMs = dueDate - Date.now() // Calcula a diferencça entre a data de vencimento e o dia atual
        const daysInMs = 1000 * 60 * 60 * 24 // Transforma ms em dias
        const dayDiff = Math.floor(timeDiffInMs / daysInMs) // Converte o tempo restante de ms para dias arredondados

        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"] // calcula o valor total do projeto
}