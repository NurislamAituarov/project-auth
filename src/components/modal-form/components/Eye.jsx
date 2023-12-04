import eye_visible from '../../../assets/images/eye_visible.png';
import slash from '../../../assets/images/eye_slash.png';

export function Eye({ visible }) {
  return <>{visible ? <img src={eye_visible} alt="visible" /> : <img src={slash} alt="slash" />}</>;
}
