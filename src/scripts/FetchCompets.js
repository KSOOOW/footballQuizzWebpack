    const url = 'https://api.football-data.org/v4/competitions';
    const api_key = process.env.API_KEY;

    // Renvoie la liste de toutes les compétitions
    export async function fetchCompets() {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': api_key,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur dans la requête : ' + response.status);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Erreur lors de la récupération des compétitions :', error);
        }
    }

    // Renvoie le nom de toutes les compétitions
    export async function getCompetsList(fetchedCompets) {
        const competsData = await fetchedCompets;
        let list = [];
        for (let i = 0; i < competsData.competitions.length; ++i) {
            list.push(competsData.competitions[i].name)
        }
        return list;
    }

    // Renvoie une compétition en prenant son nom en paramètre
    export async function fetchCompetByName(name, fetchedCompets) {
        const competsData = await fetchedCompets;
        let competCode = ''
        for (let i = 0; i < competsData.competitions.length; ++i) {
            if (competsData.competitions[i].name === name)
                competCode = competsData.competitions[i].code
        }
        const urlComp = 'https://api.football-data.org/v4/competitions/' + (competCode)
        try {
            const response = await fetch(urlComp, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': api_key,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur dans la requête : ' + response.status);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Erreur lors de la récupération des compétitions :', error);
        }
    }

    export async function getCompetTeams(compet) {

        const urlComp = 'https://api.football-data.org/v4/competitions/' + compet + '/teams'
        try {
            const response = await fetch(urlComp, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': api_key,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur dans la requête : ' + response.status);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Erreur lors de la récupération des compétitions :', error);
        }
    }
