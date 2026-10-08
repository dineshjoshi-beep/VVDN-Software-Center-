export type Platform = 'windows' | 'macos' | 'linux';

export type Category = 
  | 'development' 
  | 'internet' 
  | 'productivity' 
  | 'utilities' 
  | 'design' 
  | 'media' 
  | 'security';

export type PackageManager = 
  | 'winget' 
  | 'choco' 
  | 'brew' 
  | 'apt' 
  | 'flatpak' 
  | 'snap';

export interface ManagerCommand {
  manager: PackageManager;
  packageId: string;
  installCmd: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  category: Category;
  website: string;
  license: string;
  platforms: Platform[];
  commands: {
    windows?: ManagerCommand[];
    macos?: ManagerCommand[];
    linux?: ManagerCommand[];
  };
  isCustom?: boolean;
  rating?: number;
  downloads?: string;
  isTrending?: boolean;
}

export interface CustomPackageInput {
  name: string;
  description: string;
  category: Category;
  website: string;
  license: string;
  platforms: Platform[];
  windowsId?: string;
  macosId?: string;
  linuxId?: string;
}

export interface SystemCheckRule {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  checkCommand: string;
  remedyCommand?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

