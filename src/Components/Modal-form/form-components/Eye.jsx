import eye_visible from '../../../Images/eye_visible.png';
import slash from '../../../Images/eye_slash.png';

export function Eye({ visible }) {
  return <>{visible ? <img src={eye_visible} alt="visible" /> : <img src={slash} alt="slash" />}</>;
}
