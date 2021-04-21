const Database = require('../db/config')

module.exports = {
    // Exporta os dados do arquivo
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                createdAt: job.created_at
        }))
    },

    // Cria um novo job
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.createdAt}
        )`)

        await db.close()
    },

    // Atualiza os dados
    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE jobs SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}

            WHERE id = ${jobId}
        `)

        await db.close()
    },

    // Detela os dados do job excluido
    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    }
}