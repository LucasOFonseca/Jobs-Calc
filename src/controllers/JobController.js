const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    /*----------------------------------------------------------------
    ** push() envia o parâmetro para o array ao qual está atribuida
    **
    ** redirect() redireciona o usuário para o endereço atribuido como parâmetro
    */
    async save(req, res) {
        const jobs = await Job.get() // Constante que armazena os dados de job
        
        const job = req.body // Armazena os valores do objeto req.body
        
        await Job.create({
            name: job.name,
            "daily-hours": job["daily-hours"],
            "total-hours": job["total-hours"],
            createdAt: Date.now() // Identifica e armazena a data de quando o job foi adicionado
        })

        return res.redirect('/')
    },

    create(req, res) {
        return res.render("job")
    },

    // Transfere as informações do job para a página de edição
    async show(req, res) {
        const jobs = await Job.get() // Constante que armazena os dados de job
        const profile = await Profile.get() // Constante que armazena os dados do perfil

        const jobId = req.params.id // Constante que armazena o id do job como um parâmetro

        const job = jobs.find(job => Number(job.id) === Number(jobId)) // Procura o id passado na URL nos dados do job para mostrar ao usuário

        if(!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job }) // Retorna o id para a URL
    },

    // Aplica as alterações feitas pelo usuário na pagina edit ao job editado
    async update(req, res) {
        const jobId = req.params.id // Constante que armazena o id do job como um parâmetro

        // Armazena as alterações do job
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    // Função para deletar um job
    async delete(req, res) {
        const jobId = req.params.id // Constante que armazena o id do job como um parâmetro

        await Job.delete(jobId)

        res.redirect('/')
    }
}