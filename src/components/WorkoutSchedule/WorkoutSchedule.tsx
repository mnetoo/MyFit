import React, { useState } from 'react';
import './WorkoutSchedule.css';

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
  target: string;
}

interface DailyWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const WorkoutSchedule: React.FC = () => {
  // Estado para os checkbox (já existia)
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});
  
  // NOVO: Estado para controlar quais dias estão abertos
  // Começa vazio, ou seja, todos fechados
  const [openDays, setOpenDays] = useState<{ [key: number]: boolean }>({});

  const toggleExercise = (dayIndex: number, exerciseIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    setCompletedExercises((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // NOVO: Função para abrir/fechar o dia
  const toggleDay = (index: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [index]: !prev[index], // Inverte o valor atual (true vira false, false vira true)
    }));
  };

  const workouts: DailyWorkout[] = [
    {
      day: 'Segunda-Feira',
      focus: 'Glúteos',
      exercises: [
        { name: 'Agachamento Sumo', sets: 4, reps: 15, target: 'Glúteo' },
        { name: 'Elevação Pélvica', sets: 4, reps: 20, target: 'Glúteo' },
        { name: 'Afundo com Haltere', sets: 3, reps: 12, target: 'Glúteo' },
        { name: 'Cadeira Abdutora', sets: 3, reps: 15, target: 'Glúteo' },
        { name: 'Glúteo Maquina', sets: 3, reps: 15, target: 'Glúteo' },
        { name: 'Agachamento Livre', sets: 3, reps: 15, target: 'Quadríceps' },
      ],
    },
    {
      day: 'Terça-Feira',
      focus: 'Ombro, Peito & Tríceps',
      exercises: [
        { name: 'Supino Reto', sets: 4, reps: 12, target: 'Peito' },
        { name: 'Desenvolvimento com Halteres', sets: 3, reps: 12, target: 'Ombro' },
        { name: 'Elevação Lateral', sets: 3, reps: 15, target: 'Ombro' },
        { name: 'Tríceps Pulley', sets: 3, reps: 15, target: 'Tríceps' },
        { name: 'Tríceps Testa', sets: 3, reps: 12, target: 'Tríceps' },
        { name: 'Peck Deck', sets: 3, reps: 15, target: 'Peito' },
      ],
    },
    {
      day: 'Quarta-Feira',
      focus: 'Pernas (Foco em quadríceps)',
      exercises: [
        { name: 'Leg. 45', sets: 4, reps: 15, target: 'Quadríceps' },
        { name: 'Agachamento Hack', sets: 3, reps: 12, target: 'Quadríceps' },
        { name: 'Extensora', sets: 3, reps: 15, target: 'Quadríceps' },
        { name: 'Agachamento Búlgaro', sets: 3, reps: 12, target: 'Quadríceps' },
        { name: 'Avanço com Halteres', sets: 3, reps: 12, target: 'Quadríceps' },
        { name: 'Cadeira Flexora', sets: 3, reps: 15, target: 'Posterior' },
      ],
    },
    {
      day: 'Quinta-Feira',
      focus: 'Costas & Bíceps',
      exercises: [
        { name: 'Pulldown', sets: 4, reps: 12, target: 'Costas' },
        { name: 'Remada Baixa', sets: 3, reps: 15, target: 'Costas' },
        { name: 'Remada Curvada', sets: 3, reps: 12, target: 'Costas' },
        { name: 'Rosca direta Barra', sets: 3, reps: 15, target: 'Bíceps' },
        { name: 'Rosca Alternada', sets: 3, reps: 12, target: 'Bíceps' },
        { name: 'Rosca Martelo', sets: 3, reps: 12, target: 'Bíceps' },
      ],
    },
    {
      day: 'Sexta-Feira',
      focus: 'Pernas (Foco em posteriores, glúteos & panturrilha)',
      exercises: [
        { name: 'Stiff', sets: 4, reps: 15, target: 'Posterior' },
        { name: 'Cadeira Flexora', sets: 4, reps: 15, target: 'Posterior' },
        { name: 'Elevação Pélvica', sets: 3, reps: 20, target: 'Glúteo' },
        { name: 'Agachamento Sumo', sets: 3, reps: 12, target: 'Glúteo' },
        { name: 'Gêmeos Sentado', sets: 4, reps: '10>20', target: 'Panturrilha' },
      ],
    },
  ];

  return (
    <div className="schedule-container">
      <h1 className="main-title">Meus Treinos</h1>
      <div className="workouts-grid">
        {workouts.map((workout, dayIdx) => {
          const isOpen = !!openDays[dayIdx];
          
          return (
            <div key={dayIdx} className={`workout-card ${isOpen ? 'open' : ''}`}>
              {/* Cabeçalho agora é clicável */}
              <div className="card-header" onClick={() => toggleDay(dayIdx)}>
                <div className="header-content">
                  <h2 className="day-title">{workout.day}</h2>
                  <h3 className="focus-subtitle">{workout.focus}</h3>
                </div>
                {/* Ícone de seta */}
                <span className={`arrow-icon ${isOpen ? 'rotated' : ''}`}>▼</span>
              </div>

              {/* Container que vai abrir e fechar */}
              <div className="accordion-content">
                <div className="table-responsive">
                  <table className="workout-table">
                    <thead>
                      <tr>
                        <th className="th-check">Ok</th>
                        <th className="th-left">Exercícios</th>
                        <th>Séries</th>
                        <th>Repetições</th>
                        <th className="th-right">Trabalho</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((ex, exIdx) => {
                        const isCompleted = !!completedExercises[`${dayIdx}-${exIdx}`];
                        return (
                          <tr 
                            key={exIdx} 
                            className={isCompleted ? 'row-completed' : ''}
                            onClick={() => toggleExercise(dayIdx, exIdx)}
                          >
                            <td className="td-check">
                              <input 
                                type="checkbox" 
                                checked={isCompleted} 
                                onChange={() => toggleExercise(dayIdx, exIdx)}
                                onClick={(e) => e.stopPropagation()} 
                              />
                            </td>
                            <td className="td-name">{ex.name}</td>
                            <td className="td-center">{ex.sets}</td>
                            <td className="td-center">{ex.reps}</td>
                            <td className="td-right">{ex.target}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutSchedule;