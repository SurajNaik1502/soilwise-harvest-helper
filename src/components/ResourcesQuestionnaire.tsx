
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ResourcesData } from '@/types/soil';
import { Check } from 'lucide-react';

interface ResourcesQuestionnaireProps {
  onResourcesUpdate: (resources: ResourcesData) => void;
}

const ResourcesQuestionnaire: React.FC<ResourcesQuestionnaireProps> = ({ onResourcesUpdate }) => {
  const [resources, setResources] = useState<ResourcesData>({
    waterAvailability: 'Medium',
    landSize: 'Medium',
    experience: 'Beginner',
    equipmentAccess: 'Limited',
    laborAvailability: 'Medium'
  });
  
  const [isComplete, setIsComplete] = useState(false);
  
  const handleChange = (key: keyof ResourcesData, value: any) => {
    setResources(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = () => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(resources).every(value => value !== '');
    
    if (!allFieldsFilled) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    
    onResourcesUpdate(resources);
    setIsComplete(true);
    toast.success("Resources information submitted successfully!");
  };
  
  return (
    <Card className="soil-card p-6 animate-grow">
      <h2 className="text-xl font-semibold text-soil-darkest mb-4">Available Resources</h2>
      
      {isComplete ? (
        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-2 mb-4">
            <Check className="w-8 h-8 text-soil-darkest" />
          </div>
          <h3 className="text-lg font-medium text-soil-darkest mb-2">Resources Submitted</h3>
          <p className="text-gray-600 text-center mb-4">Thank you for providing your resource information.</p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div>
              <p className="text-sm font-medium text-gray-500">Water Availability</p>
              <p className="text-soil-dark">{resources.waterAvailability}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Land Size</p>
              <p className="text-soil-dark">{resources.landSize}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Experience Level</p>
              <p className="text-soil-dark">{resources.experience}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Equipment Access</p>
              <p className="text-soil-dark">{resources.equipmentAccess}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Labor Availability</p>
              <p className="text-soil-dark">{resources.laborAvailability}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 border-soil text-soil-darkest hover:bg-soil-lightest"
            onClick={() => setIsComplete(false)}
          >
            Edit Resources
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Water Availability
            </label>
            <Select 
              value={resources.waterAvailability}
              onValueChange={(value) => handleChange('waterAvailability', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select water availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low (Rainwater only, limited irrigation)</SelectItem>
                <SelectItem value="Medium">Medium (Occasional irrigation available)</SelectItem>
                <SelectItem value="High">High (Regular/abundant water access)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Size
            </label>
            <Select 
              value={resources.landSize}
              onValueChange={(value) => handleChange('landSize', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select land size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small (Urban garden, &lt; 100 sq ft)</SelectItem>
                <SelectItem value="Medium">Medium (Large garden, 100-500 sq ft)</SelectItem>
                <SelectItem value="Large">Large (Small farm, &gt; 500 sq ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <Select 
              value={resources.experience}
              onValueChange={(value) => handleChange('experience', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner (First time gardener)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (Some experience)</SelectItem>
                <SelectItem value="Advanced">Advanced (Experienced gardener)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment Access
            </label>
            <Select 
              value={resources.equipmentAccess}
              onValueChange={(value) => handleChange('equipmentAccess', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select equipment access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Limited">Limited (Basic hand tools only)</SelectItem>
                <SelectItem value="Moderate">Moderate (Some power tools)</SelectItem>
                <SelectItem value="Extensive">Extensive (Full range of tools)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Labor Availability
            </label>
            <Select 
              value={resources.laborAvailability}
              onValueChange={(value) => handleChange('laborAvailability', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select labor availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low (Few hours per week)</SelectItem>
                <SelectItem value="Medium">Medium (Several hours per week)</SelectItem>
                <SelectItem value="High">High (Daily availability)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="soil-button w-full mt-2"
            onClick={handleSubmit}
          >
            Submit Resources
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ResourcesQuestionnaire;
