
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2 } from "lucide-react";

// Define a simple interface based on the table structure
interface SeatBlock {
  id: string;
  name: string;
  total_seats: number;
  available_seats: number;
  created_at: string;
  updated_at: string;
}

const SeatPlanSection = () => {
  const [blocks, setBlocks] = useState<SeatBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newBlockName, setNewBlockName] = useState("");
  const [newTotalSeats, setNewTotalSeats] = useState("");

  const fetchBlocks = async () => {
    try {
      const { data, error } = await supabase
        .from('seat_blocks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setBlocks(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch seat blocks");
      console.error("Error fetching seat blocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleAddBlock = async () => {
    try {
      if (!newBlockName || !newTotalSeats) {
        toast.error("Please fill in all fields");
        return;
      }

      const totalSeats = parseInt(newTotalSeats);
      const { error } = await supabase
        .from('seat_blocks')
        .insert({
          name: newBlockName,
          total_seats: totalSeats,
          available_seats: totalSeats,
        });

      if (error) throw error;

      toast.success("Seat block added successfully");
      setNewBlockName("");
      setNewTotalSeats("");
      fetchBlocks();
    } catch (error: any) {
      toast.error("Failed to add seat block");
      console.error("Error adding seat block:", error);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    try {
      const { error } = await supabase
        .from('seat_blocks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Seat block deleted successfully");
      fetchBlocks();
    } catch (error: any) {
      toast.error("Failed to delete seat block");
      console.error("Error deleting seat block:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Seat Plan Management</h2>
        <p className="text-gray-600">Manage seat blocks and availability</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Seat Block</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="blockName">Block Name</Label>
            <Input
              id="blockName"
              value={newBlockName}
              onChange={(e) => setNewBlockName(e.target.value)}
              placeholder="e.g., Block A"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalSeats">Total Seats</Label>
            <Input
              id="totalSeats"
              type="number"
              value={newTotalSeats}
              onChange={(e) => setNewTotalSeats(e.target.value)}
              placeholder="e.g., 50"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddBlock} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Block
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Block Name</TableHead>
              <TableHead>Total Seats</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : blocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No seat blocks found
                </TableCell>
              </TableRow>
            ) : (
              blocks.map((block) => (
                <TableRow key={block.id}>
                  <TableCell>{block.name}</TableCell>
                  <TableCell>{block.total_seats}</TableCell>
                  <TableCell>{block.available_seats}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteBlock(block.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SeatPlanSection;
