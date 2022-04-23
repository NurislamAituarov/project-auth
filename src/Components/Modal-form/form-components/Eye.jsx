import eye_visible from '../../../assets/eye_visible.png';
import slash from '../../../assets/eye_slash.png';

export function Eye({ visible }) {
  return <>{visible ? <img src={eye_visible} alt="visible" /> : <img src={slash} alt="slash" />}</>;
}
