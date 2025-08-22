import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HiArrowRight,
  HiShieldCheck,
  HiUsers,
  HiStar,
  HiCheck,
  HiEnvelope,
  HiCloud
} from 'react-icons/hi2'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'

export function DSBusinessCards() {

  return (
    <div className="space-y-16">
      {/* Service Cards - 핵심 비즈니스 카드 6종 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Service Card - 서비스 소개용 */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <HiCloud className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Popular</Badge>
            </div>
            <CardTitle className="mt-4">Cloud Solutions</CardTitle>
            <CardDescription>
              Scalable cloud infrastructure for modern businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>99.9% Uptime SLA</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>Auto-scaling</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Learn More
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Pricing Card - 요금제 표시용 */}
        <Card>
          <CardHeader>
            <Badge className="w-fit mb-2">Most Popular</Badge>
            <CardTitle>Professional</CardTitle>
            <CardDescription>Perfect for growing teams</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>Up to 20 users</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span>API access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Start Free Trial
            </Button>
          </CardFooter>
        </Card>

        {/* Feature Card - 기능 하이라이트용 */}
        <Card>
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
              <HiShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Enterprise Security</CardTitle>
            <CardDescription>
              Bank-level security for your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption</span>
                  <Badge variant="outline">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compliance</span>
                  <Badge variant="outline">SOC 2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup</span>
                  <Badge variant="outline">Daily</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>

        {/* Team Member Card - 팀 소개용 */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <HiUsers className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>CEO & Founder</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              15+ years of experience in enterprise software
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="ghost" size="icon">
                <FaLinkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <FaTwitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <HiEnvelope className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Card - 고객 후기용 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <CardDescription>
              "This product has transformed our business operations. 
              The ROI has been incredible, and the support team is fantastic."
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-muted-foreground">CEO at TechCorp</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* CTA Card - 액션 유도용 */}
        <Card className="border-primary">
          <CardHeader>
            <Badge className="w-fit mb-2">Limited Offer</Badge>
            <CardTitle>Start Your Free Trial</CardTitle>
            <CardDescription>
              Get 30 days free access to all premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Full access to all features</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1">
              Start Free Trial
            </Button>
            <Button variant="outline" className="flex-1">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}