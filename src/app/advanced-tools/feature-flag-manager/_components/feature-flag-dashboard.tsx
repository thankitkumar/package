
'use client';

import { useState } from 'react';
import { useFeatureFlags, type FeatureFlag, type RolloutCondition } from '@/hooks/use-feature-flags';
import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent } from '@/components/reactify/card';
import { ReactifyToggleSwitch } from '@/components/reactify/toggle-switch';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyModal } from '@/components/reactify/modal';
import { ReactifyInput } from '@/components/reactify/input';
import { ReactifyTextarea } from '@/components/reactify/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit3, Trash2, ListChecks, Settings2 } from 'lucide-react';

const ConditionTypeDescriptions: Record<RolloutCondition['type'], string> = {
  userPercentage: "Target a percentage of users.",
  specificUsers: "Target specific user IDs or emails (comma-separated).",
  environment: "Target specific deployment environments (e.g., staging, production).",
  custom: "Define a custom condition string (e.g., attribute:value).",
};

function EditConditionsModal({
  flag,
  isOpen,
  onClose,
  onSave,
}: {
  flag: FeatureFlag;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedConditions: RolloutCondition[]) => void;
}) {
  const [conditions, setConditions] = useState<RolloutCondition[]>(() => 
    JSON.parse(JSON.stringify(flag.rolloutConditions)) // Deep copy
  );

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { id: `new-${Date.now()}`, type: 'userPercentage', value: 0, description: 'New condition' },
    ]);
  };

  const handleRemoveCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const handleConditionChange = (id: string, field: keyof RolloutCondition, newValue: any) => {
    setConditions(
      conditions.map((c) =>
        c.id === id ? { ...c, [field]: newValue, 
            // Auto-update description for known types
            description: field === 'type' || field === 'value' ? 
                         generateConditionDescription({ ...c, [field]: newValue } as RolloutCondition) : c.description
        } : c
      )
    );
  };

  const generateConditionDescription = (condition: RolloutCondition): string => {
    switch (condition.type) {
        case 'userPercentage': return `Enabled for ${condition.value}% of users.`;
        case 'specificUsers': return `Enabled for users: ${condition.value}.`;
        case 'environment': return `Enabled for environment: ${condition.value}.`;
        case 'custom': return `Custom: ${condition.value}.`;
        default: return condition.description || "Condition";
    }
  };

  const handleSaveChanges = () => {
    onSave(conditions);
    onClose();
  };

  return (
    <ReactifyModal isOpen={isOpen} onClose={onClose} title={`Edit Conditions for ${flag.name}`} className="max-w-2xl">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {conditions.map((condition, index) => (
          <ReactifyCard key={condition.id} className="p-4 bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <Label htmlFor={`condition-type-${index}`}>Type</Label>
                <Select
                  value={condition.type}
                  onValueChange={(newType: RolloutCondition['type']) => handleConditionChange(condition.id, 'type', newType)}
                >
                  <SelectTrigger id={`condition-type-${index}`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(ConditionTypeDescriptions).map(key => (
                      <SelectItem key={key} value={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 <p className="text-xs text-muted-foreground mt-1">{ConditionTypeDescriptions[condition.type]}</p>
              </div>
              <div>
                <Label htmlFor={`condition-value-${index}`}>Value</Label>
                <ReactifyInput
                  id={`condition-value-${index}`}
                  type={condition.type === 'userPercentage' ? 'number' : 'text'}
                  value={condition.value}
                  onChange={(e) => handleConditionChange(condition.id, 'value', condition.type === 'userPercentage' ? parseInt(e.target.value) || 0 : e.target.value)}
                />
              </div>
            </div>
            <div>
                <Label htmlFor={`condition-desc-${index}`}>Display Description</Label>
                <ReactifyTextarea
                    id={`condition-desc-${index}`}
                    value={condition.description}
                    onChange={(e) => handleConditionChange(condition.id, 'description', e.target.value)}
                    rows={2}
                    placeholder="Descriptive text for this condition"
                />
            </div>
            <ReactifyButton
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveCondition(condition.id)}
              className="mt-3"
              leftIcon={<Trash2 size={14}/>}
            >
              Remove
            </ReactifyButton>
          </ReactifyCard>
        ))}
        <ReactifyButton variant="outline" onClick={handleAddCondition} leftIcon={<PlusCircle size={16}/>}>
          Add Condition
        </ReactifyButton>
      </div>
      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <ReactifyButton variant="ghost" onClick={onClose}>Cancel</ReactifyButton>
        <ReactifyButton onClick={handleSaveChanges}>Save Changes</ReactifyButton>
      </div>
    </ReactifyModal>
  );
}


export function FeatureFlagDashboard() {
  const { featureFlags, toggleFlag, updateFlag, addFlag } = useFeatureFlags();
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFlagData, setNewFlagData] = useState({ name: '', description: '', isEnabled: false });

  const handleEditConditions = (flag: FeatureFlag) => {
    setEditingFlag(flag);
  };

  const handleSaveConditions = (id: string, updatedConditions: RolloutCondition[]) => {
    const flagToUpdate = featureFlags.find(f => f.id === id);
    if (flagToUpdate) {
      updateFlag({ ...flagToUpdate, rolloutConditions: updatedConditions });
    }
  };

  const handleAddNewFlag = () => {
    if(newFlagData.name.trim() === '') {
        alert('Flag name cannot be empty.'); // Basic validation
        return;
    }
    addFlag(newFlagData);
    setIsAddModalOpen(false);
    setNewFlagData({ name: '', description: '', isEnabled: false }); // Reset form
  };


  return (
    <div className="space-y-8">
        <div className="flex justify-end">
            <ReactifyButton onClick={() => setIsAddModalOpen(true)} leftIcon={<PlusCircle size={18}/>}>
                Add New Flag
            </ReactifyButton>
        </div>

      {featureFlags.map((flag) => (
        <ReactifyCard key={flag.id} className="shadow-md hover:shadow-lg transition-shadow">
          <ReactifyCardHeader>
            <div className="flex justify-between items-start">
              <div>
                <ReactifyCardTitle className="font-headline text-xl">{flag.name}</ReactifyCardTitle>
                <ReactifyCardDescription>{flag.description}</ReactifyCardDescription>
              </div>
              <ReactifyToggleSwitch
                id={`toggle-${flag.id}`}
                checked={flag.isEnabled}
                onChange={() => toggleFlag(flag.id)}
                size="md"
                aria-label={`Toggle ${flag.name}`}
              />
            </div>
          </ReactifyCardHeader>
          <ReactifyCardContent>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-1.5">
                <ListChecks size={16} /> Rollout Conditions:
              </h4>
              {flag.rolloutConditions.length > 0 ? (
                <ul className="list-disc list-inside pl-1 space-y-1.5 text-sm text-foreground/80">
                  {flag.rolloutConditions.map((condition) => (
                    <li key={condition.id}>
                      <span className="font-medium text-foreground/90">{condition.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span> {condition.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic">No specific rollout conditions. Relies on master toggle.</p>
              )}
              <ReactifyButton
                variant="outline"
                size="sm"
                onClick={() => handleEditConditions(flag)}
                className="mt-3"
                leftIcon={<Edit3 size={14}/>}
              >
                Edit Conditions
              </ReactifyButton>
            </div>
          </ReactifyCardContent>
        </ReactifyCard>
      ))}

      {editingFlag && (
        <EditConditionsModal
          flag={editingFlag}
          isOpen={!!editingFlag}
          onClose={() => setEditingFlag(null)}
          onSave={(updatedConditions) => {
            handleSaveConditions(editingFlag.id, updatedConditions);
            setEditingFlag(null);
          }}
        />
      )}

        <ReactifyModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Feature Flag" className="max-w-lg">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="new-flag-name">Flag Name</Label>
                    <ReactifyInput 
                        id="new-flag-name" 
                        value={newFlagData.name} 
                        onChange={(e) => setNewFlagData(prev => ({...prev, name: e.target.value}))} 
                        placeholder="e.g., new-checkout-flow"
                    />
                </div>
                <div>
                    <Label htmlFor="new-flag-desc">Description</Label>
                    <ReactifyTextarea 
                        id="new-flag-desc" 
                        value={newFlagData.description} 
                        onChange={(e) => setNewFlagData(prev => ({...prev, description: e.target.value}))}
                        placeholder="Briefly describe what this flag controls"
                        rows={3}
                    />
                </div>
                 <div>
                    <ReactifyToggleSwitch
                        id="new-flag-enabled"
                        label="Enable this flag by default?"
                        checked={newFlagData.isEnabled}
                        onChange={(e) => setNewFlagData(prev => ({...prev, isEnabled: e.target.checked}))}
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <ReactifyButton variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</ReactifyButton>
                <ReactifyButton onClick={handleAddNewFlag}>Add Flag</ReactifyButton>
            </div>
        </ReactifyModal>
    </div>
  );
}
