describe('Filtrage des séances à venir (US13)', () => {
  it('devrait garder uniquement les séances à partir d’aujourd’hui', () => {
    const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD

    const reservations = [
      {
        film: { titre: 'Ancien film' },
        seance: { jour: '2023-01-01' },
        nbPlaces: 1
      },
      {
        film: { titre: 'Film aujourd’hui' },
        seance: { jour: today },
        nbPlaces: 2
      },
      {
        film: { titre: 'Film futur' },
        seance: { jour: '2099-12-31' },
        nbPlaces: 3
      }
    ];

    const seancesAVenir = reservations.filter(r => r.seance.jour >= today);

    expect(seancesAVenir.length).toBe(2);
    expect(seancesAVenir[0].film.titre).toBe('Film aujourd’hui');
    expect(seancesAVenir[1].film.titre).toBe('Film futur');
  });
});
