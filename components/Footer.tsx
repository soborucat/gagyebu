import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-neutral">
      <p>&copy; {new Date().getFullYear()} 슬기로운 지갑일기. 모든 권리 보유.</p>
      <p className="text-sm">React와 Tailwind CSS 기반으로 제작되었습니다.</p>
    </footer>
  );
};

export default Footer;