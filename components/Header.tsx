import React from 'react';
import { WalletIcon } from './icons/WalletIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-content p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <WalletIcon className="h-10 w-10 mr-3" />
        <h1 className="text-3xl font-bold tracking-tight">슬기로운 지갑일기</h1>
      </div>
    </header>
  );
};

export default Header;