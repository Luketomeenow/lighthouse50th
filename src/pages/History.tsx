
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const History = () => {
  return (
    <div className="min-h-screen bg-green-900 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8 text-center">Our History</h1>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white space-y-12">
            {/* Scripture */}
            <div className="text-center p-6 bg-yellow-500/10 rounded-lg">
              <blockquote className="text-xl md:text-2xl italic text-gray-200">
                "Unto Him be glory in the church by Christ Jesus throughout all ages, world without end. Amen."
              </blockquote>
              <p className="mt-4 text-yellow-300">EPHESIANS 3:21</p>
            </div>
            
            {/* Senior Pastor */}
            <div>
              <h2 className="text-3xl font-bold text-yellow-500 mb-6">THE SENIOR PASTOR</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src="/lovable-uploads/a681c1f9-9780-4c4e-bb09-22d8a1f0edc6.png" 
                    alt="Bishop Reuben M. Abante" 
                    className="rounded-full w-48 h-48 object-cover shadow-xl"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="mb-4 text-gray-300">
                    Bishop Reuben M. Abante was born on May 6, 1958 to Tatay Ben Abante Sr. and Nanay Priscilla Mirando Abante. He received the Lord Jesus Christ as his Savior and Lord at the tender age of seven and has since been serving God according to his God-given abilities and talents. His preparations for the work of the Lord include growing up under the preaching and personal tutelage of his father.
                  </p>
                  <p className="mb-4 text-gray-300">
                    Before he surrendered to full-time church ministry in March 1995, he practiced his engineering profession and rose up from the ranks to become a division manager in a leading marketing institution dealing in electronics, electrical and communications systems and products.
                  </p>
                  <p className="mb-4 text-gray-300">
                    He is married to Imelda, and they are blessed with three daughters: Rhea (married to Darwin Ilan), Rhesa (married to Gabby Yebra), Rinnah, and five grandchildren.
                  </p>
                  <p className="text-gray-300">
                    In addition to being the Bishop of Lighthouse Bible Baptist Church of Tatalon, QC., he also currently serves as Chairman of The Great Lighthouse Foundation, Inc (TGLFI), Vice-President of the Ben Abante Baptist Bible College, Vice-Chair of the Far East Broadcasting Company (FEBC), Chair of Friendship Builders, Corporate Secretary of Global Filipino Movement (GFM), Secretary General of Bible Believers League for Morality and Democracy (BIBLEMODE), President of the Baptist Bible Fellowship of the Philippines 1953, Inc (BBFPI1953), Chair of OneVote Movement, among others.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Founder */}
            <div>
              <h2 className="text-3xl font-bold text-yellow-500 mb-6">THE FOUNDER</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src="/lovable-uploads/75f52ed4-e66c-4ea3-afa8-23c9785d6478.png" 
                    alt="Tatay Abante" 
                    className="rounded-full w-48 h-48 object-cover shadow-xl"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="mb-4 text-gray-300">
                    Tatay Abante, born on December 1, 1930 at Logonoy, Bicol, received Christ as his personal Savior in 1949. He served as a preacher and then as an associate pastor at the Baptist Bible Church Sociego from 1953 up to the early part of 1976. He contributed to the founding and establishment of the Manila Bible Baptist College in 1974, later renamed as Asia Baptist Bible Colleges.
                  </p>
                  <p className="mb-4 text-gray-300">
                    Tatay was among the first graduates in theology of the Baptist Bible College in Makati, established by Rev. L. D. Woosley, graduating on top of his class. He was the president of the Baptist Bible Fellowship of the Philippines, Incorporated (BBFPI) from the mid-70's to 1985, leaving as his legacy a greater recognition and appreciation for, and strengthening of, Filipino pastoral leadership.
                  </p>
                  <p className="mb-4 text-gray-300">
                    Tatay Abante was married to the former Priscilla Mirando and they had four sons: Benny Jr., Hernes, Reuben and Irah (deceased).
                  </p>
                  <p className="text-gray-300">
                    From the time he surrendered to serve God until he was promoted to heaven in 1999, Tatay Abante remained true and faithful to God's calling. He was a great pulpiteer, a dynamic preacher and leader known for his strong stand in Baptist Distinctives, a warrior of faith, a patient teacher, a caring Pastor, a loving Tatay, and a faithful man of God.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default History;
