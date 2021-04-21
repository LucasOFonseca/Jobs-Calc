const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) { 
        const jobs = await Job.get() // Constante que armazena os dados de job
        const profile = await Profile.get() // Constante que armazena os dados do perfil

        // Variável que armazena os status de jobs
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length // Traz o tamanho do array jobs
        }

        let jobTotalHours = 0 // Armazena a quantidade total de horas dedicadas aos jobs
    
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress' // Se dias restantes for menor ou igual a 0 então "done" se não "progress"

            statusCount[status] += 1 // Soma a quantidade de status

            // Adiciona a quantidade de horas por dia dedicadas ao job se o status for progress
            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours
    
            return {
                ...job, // ... = espalhamento
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours // Variável que armazena a quantidade de horas livres por dia
        
        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours }) // Os objetos passados como parâmetro são enviados para o arquivo ejs de destino
    }
}