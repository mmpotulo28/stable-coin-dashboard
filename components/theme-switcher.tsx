import React from 'react';
import { useTheme } from "@heroui/use-theme";
import { Switch } from '@heroui/react';
import { Icon } from "@iconify/react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <Icon icon="lucide:sun" className={theme === 'light' ? 'text-primary' : 'text-default-500'} />
      <Switch
        isSelected={theme === 'dark'}
        onValueChange={handleToggle}
        size="sm"
      />
      <Icon icon="lucide:moon" className={theme === 'dark' ? 'text-primary' : 'text-default-500'} />
    </div>
  );
}