import type { Skill } from '@/config/portfolio.config';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const { name, level, Icon } = skill;
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-headline flex items-center">
          {Icon && <Icon className="mr-3 h-6 w-6 text-primary" />}
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Proficiency</span>
          <span className="text-sm font-semibold text-primary">{level}%</span>
        </div>
        <Progress value={level} aria-label={`${name} proficiency: ${level}%`} className="h-3 [&>div]:bg-primary" />
      </CardContent>
    </Card>
  );
}
