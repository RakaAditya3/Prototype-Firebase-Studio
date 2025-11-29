import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Candidate } from '@/lib/data'
import { Star } from 'lucide-react'

type CandidateCardProps = {
  candidate: Candidate
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person portrait" />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg">{candidate.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent-foreground fill-accent-foreground" />
                <span>{candidate.rating.toFixed(1)}/5.0</span>
             </div>
             <span>&middot;</span>
             <span>{candidate.completedJobs} jobs completed</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Button>Invite</Button>
      </CardContent>
    </Card>
  )
}
