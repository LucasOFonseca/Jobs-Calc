const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        
        return res.render("profile", { profile: await Profile.get() }) // Valor entre {} é o bjeto enviado para o "profile.ejs"
    },

    // Função que calcula o valor da hora
    async update(req, res) {
        // req.body para pegar dados
        const data = req.body

        const weeksPerYear = 52 // Quantas semanas tem no ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 // Remover as semanas de férias do ano para pegar quantas semanas tem 1 mês
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"] // Quantas horas por semana vou trabalhar
        const monthlyTotalHours = weekTotalHours * weeksPerMonth // Total de horas trabalhadas por mês

        // Calcula o valor da hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        // Função que atualiza os dados do perfil
        await Profile.update({
            ... profile,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect("/profile")
    }
}