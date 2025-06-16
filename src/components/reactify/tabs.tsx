
'use client';
import { useState, type ReactNode, Children, isValidElement, cloneElement } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyTabProps extends ReactifyComponentProps {
  label: string;
  disabled?: boolean;
}

export function ReactifyTab({ children, label, disabled, className, ...props }: ReactifyTabProps) {
  // This component is mostly a data carrier for ReactifyTabs
  // Its children will be rendered by ReactifyTabs when it's active.
  return <div className={className} {...props}>{children}</div>;
}
ReactifyTab.displayName = "ReactifyTab";


interface ReactifyTabsProps extends ReactifyComponentProps {
  children: ReactNode; // Expect ReactifyTab components
  defaultActiveTab?: number; // Index of the tab to be active by default
  onTabChange?: (activeIndex: number) => void;
  variant?: 'line' | 'enclosed';
}

export function ReactifyTabs({
  children,
  className,
  defaultActiveTab = 0,
  onTabChange,
  variant = 'line',
  as: Component = 'div',
  ...props
}: ReactifyTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const tabs = Children.toArray(children).filter(child => 
    isValidElement(child) && child.type === ReactifyTab
  ) as Array<React.ReactElement<ReactifyTabProps>>;

  const handleTabClick = (index: number) => {
    if (tabs[index].props.disabled) return;
    setActiveTab(index);
    onTabChange?.(index);
  };
  
  const tablistBaseStyles = "flex border-b border-border";
  const tablistVariantStyles = {
    line: "",
    enclosed: "border-transparent"
  };

  const tabBaseStyles = "py-2 px-4 -mb-px cursor-pointer transition-colors duration-150 ease-in-out font-medium";
  const tabVariantStyles = {
    line: {
      base: "border-b-2 border-transparent hover:border-muted-foreground/50",
      active: "border-primary text-primary",
      disabled: "text-muted-foreground cursor-not-allowed opacity-50 hover:border-transparent",
    },
    enclosed: {
      base: "border border-transparent rounded-t-md hover:bg-muted",
      active: "bg-background border-border border-b-transparent text-primary",
      disabled: "text-muted-foreground cursor-not-allowed opacity-50 hover:bg-transparent",
    }
  };


  return (
    <Component className={cn(className)} {...props}>
      <div 
        role="tablist" 
        aria-orientation="horizontal"
        className={cn(tablistBaseStyles, tablistVariantStyles[variant])}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`reactify-tabpanel-${index}`}
            id={`reactify-tab-${index}`}
            onClick={() => handleTabClick(index)}
            disabled={tab.props.disabled}
            className={cn(
              tabBaseStyles,
              tabVariantStyles[variant].base,
              activeTab === index && tabVariantStyles[variant].active,
              tab.props.disabled && tabVariantStyles[variant].disabled
            )}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`reactify-tabpanel-${index}`}
          aria-labelledby={`reactify-tab-${index}`}
          hidden={activeTab !== index}
          className={cn("py-4", variant === 'enclosed' && activeTab === index && 'border border-t-0 rounded-b-md p-4')}
        >
          {activeTab === index && tab.props.children}
        </div>
      ))}
    </Component>
  );
}
