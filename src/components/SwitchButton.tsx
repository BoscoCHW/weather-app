import { useTemperature } from '../TemperatureContext';

export const SwitchButton: React.FC = () => {
  const { unit, toggleUnit } = useTemperature();
  
  return (
    <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      id="unitSwitch"
      checked={unit === 'F'}
      onChange={toggleUnit}
    />
    <label className="form-check-label text-light" htmlFor="unitSwitch" >
      {unit === 'C' ? '°C' : '°F'}
    </label>
  </div>
  );
};
