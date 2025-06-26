
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddActivityForm from "./AddActivityForm";

interface AddActivityModalProps {
  onAddActivity: (activity: any) => void;
}

const AddActivityModal = ({ onAddActivity }: AddActivityModalProps) => {
  const [open, setOpen] = useState(false);

  const handleActivityAdded = (activity: any) => {
    onAddActivity(activity);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
        </DialogHeader>
        <AddActivityForm onSubmit={handleActivityAdded} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityModal;
