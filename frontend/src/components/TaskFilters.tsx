import { TaskStatus, TaskPriority, TaskStatusLabels, TaskPriorityLabels } from '../types/task.types';

/**
 * Props del componente TaskFilters
 */
interface TaskFiltersProps {
  status?: TaskStatus;
  priority?: TaskPriority;
  onStatusChange: (status?: TaskStatus) => void;
  onPriorityChange: (priority?: TaskPriority) => void;
  onClearFilters: () => void;
}

/**
 * Componente para filtrar tareas por estado y prioridad
 * 
 * Proporciona selectores para filtrar la lista de tareas
 * y un botón para limpiar todos los filtros.
 */
export function TaskFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasFilters = status || priority;

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {/* Filtro por estado */}
        <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
          <label className="form-label" htmlFor="status-filter">
            Estado
          </label>
          <select
            id="status-filter"
            className="form-select"
            value={status || ''}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus || undefined)}
          >
            <option value="">Todos los estados</option>
            {Object.values(TaskStatus).map((s) => (
              <option key={s} value={s}>
                {TaskStatusLabels[s]}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por prioridad */}
        <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
          <label className="form-label" htmlFor="priority-filter">
            Prioridad
          </label>
          <select
            id="priority-filter"
            className="form-select"
            value={priority || ''}
            onChange={(e) => onPriorityChange(e.target.value as TaskPriority || undefined)}
          >
            <option value="">Todas las prioridades</option>
            {Object.values(TaskPriority).map((p) => (
              <option key={p} value={p}>
                {TaskPriorityLabels[p]}
              </option>
            ))}
          </select>
        </div>

        {/* Botón limpiar filtros */}
        {hasFilters && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClearFilters}
            style={{ marginBottom: 0 }}
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
