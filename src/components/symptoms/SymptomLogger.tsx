
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ThermometerIcon, 
  Frown, 
  Meh, 
  Smile, 
  Moon 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Symptom {
  id: string;
  name: string;
  value: number;
  icon: React.ReactNode;
}

const SymptomLogger: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: 'fever', name: 'Fever', value: 0, icon: <ThermometerIcon className="text-carepulse-red" /> },
    { id: 'fatigue', name: 'Fatigue', value: 0, icon: <Moon className="text-carepulse-darkblue" /> },
    { id: 'mood', name: 'Mood', value: 50, icon: <Meh className="text-carepulse-orange" /> },
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSymptomChange = (id: string, value: number) => {
    setSymptoms(symptoms.map((symptom) => 
      symptom.id === id ? { ...symptom, value } : symptom
    ));
  };

  const getMoodIcon = (value: number) => {
    if (value < 33) return <Frown className="text-carepulse-red" />;
    if (value < 66) return <Meh className="text-carepulse-orange" />;
    return <Smile className="text-green-500" />;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Symptoms logged successfully",
        description: "Your health data has been recorded and analyzed.",
      });
      // Reset form or redirect
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Your Symptoms</CardTitle>
        <CardDescription>
          Track how you feel today to monitor your health trends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={symptom.id} className="flex items-center">
                <span className="mr-2">
                  {symptom.id === 'mood' 
                    ? getMoodIcon(symptom.value) 
                    : symptom.icon}
                </span>
                {symptom.name}
              </Label>
              <span className="text-sm font-medium">
                {symptom.id === 'mood' 
                  ? symptom.value <= 33 
                    ? 'Poor' 
                    : symptom.value <= 66 
                      ? 'Neutral' 
                      : 'Good'
                  : symptom.value === 0 
                    ? 'None' 
                    : symptom.value < 33 
                      ? 'Mild' 
                      : symptom.value < 66 
                        ? 'Moderate' 
                        : 'Severe'}
              </span>
            </div>
            <Slider
              id={symptom.id}
              value={[symptom.value]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleSymptomChange(symptom.id, values[0])}
              className="py-2"
            />
          </div>
        ))}
        
        <div className="space-y-2 pt-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Describe how you're feeling, any concerns, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-carepulse-teal hover:bg-carepulse-teal/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Symptoms'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomLogger;
