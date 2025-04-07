
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Video, Headphones, Download, ExternalLink } from 'lucide-react';

const Resources = () => {
  const sermons = [
    {
      title: "The Journey of Faith",
      description: "Reflecting on 50 years of God's faithfulness",
      speaker: "Bishop Reuben M. Abante",
      date: "January 2026",
      type: "video"
    },
    {
      title: "Standing on the Promises",
      description: "How God's promises have sustained us for 50 years",
      speaker: "Bishop Reuben M. Abante",
      date: "December 2025",
      type: "audio"
    },
    {
      title: "The Foundation of Our Faith",
      description: "Looking back at the biblical principles that guided us",
      speaker: "Pastor John Smith",
      date: "November 2025",
      type: "pdf"
    },
    {
      title: "Growing in Grace",
      description: "Lessons learned through 50 years of ministry",
      speaker: "Pastor David Johnson",
      date: "October 2025",
      type: "video"
    }
  ];

  const books = [
    {
      title: "50 Years of Light",
      author: "Bishop Reuben M. Abante",
      description: "A comprehensive history of Lighthouse BBC",
      year: "2025",
      coverImage: "/lovable-uploads/ecc6f0f6-092c-4aff-91f6-91b6ac1fb688.png"
    },
    {
      title: "Foundations of Faith",
      author: "Tatay Abante",
      description: "The core teachings that established our church",
      year: "1985",
      coverImage: "/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png"
    },
    {
      title: "Biblical Leadership",
      author: "Bishop Reuben M. Abante",
      description: "Principles of godly leadership from scripture",
      year: "2010",
      coverImage: "/lovable-uploads/09e5456e-cf4d-4c98-aea8-a970dd819a8f.png"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-yellow-500" />;
      case 'audio':
        return <Headphones className="h-5 w-5 text-yellow-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-green-900 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4 text-center">Resources</h1>
          <p className="text-white text-center mb-12 max-w-3xl mx-auto">
            Access sermons, books, and other resources from Lighthouse Bible Baptist Church's 50 years of ministry.
          </p>
          
          <Tabs defaultValue="sermons" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-green-800/50 mb-8">
              <TabsTrigger value="sermons" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-green-950">Sermons</TabsTrigger>
              <TabsTrigger value="books" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-green-950">Books</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sermons">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sermons.map((sermon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border-green-800/30 text-white h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(sermon.type)}
                            <span className="text-sm text-gray-300 uppercase">{sermon.type}</span>
                          </div>
                          <span className="text-yellow-300 text-sm">{sermon.date}</span>
                        </div>
                        <CardTitle className="text-xl mt-3">{sermon.title}</CardTitle>
                        <p className="text-sm text-gray-300">By {sermon.speaker}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{sermon.description}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button variant="yellow" size="sm" className="flex-1 gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="books">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border-green-800/30 text-white h-full">
                      <div className="p-4">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-full h-48 object-contain rounded mb-4"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{book.title}</CardTitle>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-300">By {book.author}</p>
                          <span className="text-yellow-300 text-sm">{book.year}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{book.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="yellow" size="sm" className="w-full gap-1">
                          <Download className="h-4 w-4" />
                          Download Preview
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
