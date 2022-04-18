import ContentLoader from 'react-content-loader';

export function Skeleton() {
  return (
    <ContentLoader
      speed={1.5}
      width={180}
      height={40}
      viewBox="0 0 180 40"
      backgroundColor="#8a8a8a"
      foregroundColor="#212121">
      <rect x="97" y="95" rx="0" ry="0" width="0" height="1" />
      <rect x="96" y="96" rx="0" ry="0" width="1" height="0" />
      <rect x="100" y="283" rx="0" ry="0" width="10" height="2" />
      <rect x="89" y="281" rx="0" ry="0" width="21" height="1" />
      <rect x="167" y="237" rx="0" ry="0" width="0" height="1" />
      <rect x="289" y="130" rx="0" ry="0" width="0" height="1" />
      <rect x="265" y="257" rx="0" ry="0" width="2" height="0" />
      <rect x="386" y="31" rx="0" ry="0" width="30" height="20" />
      <rect x="435" y="31" rx="0" ry="0" width="30" height="20" />
      <rect x="487" y="31" rx="0" ry="0" width="30" height="20" />
      <rect x="538" y="30" rx="0" ry="0" width="30" height="20" />
      <rect x="5" y="0" rx="5" ry="5" width="78" height="40" />
      <rect x="99" y="0" rx="5" ry="5" width="78" height="40" />
    </ContentLoader>
  );
}
