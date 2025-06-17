
'use client';
import { ReactifyDivider } from '@/components/reactify/divider';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyDividerDemo() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Horizontal Divider</h3>
          <p>Some content above the divider.</p>
          <ReactifyDivider />
          <p>Some content below the divider.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Vertical Divider</h3>
          <div className="flex items-center h-20">
            <span>Left content</span>
            <ReactifyDivider orientation="vertical" /> 
            {/* self-stretch will be applied by the component in flex context */}
            <span>Right content</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Customized Divider</h3>
          <p>Content.</p>
          <ReactifyDivider className="my-8 border-primary border-dashed" />
          <p>More content.</p>
        </div>
      </CardContent>
    </Card>
  );
}
