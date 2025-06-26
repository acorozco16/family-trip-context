
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AddActivityForm from "./AddActivityForm";

interface EditActivityModalProps {
  activity: any;
  onUpdateActivity: (activity: any) => void;
}

const EditActivityModal = ({ activity, onUpdateActivity }: EditActivityModalProps) => {
  const [open, setOpen] = useState(false);

  const handleActivityUpdated = (updatedActivity: any) => {
    onUpdateActivity(updatedActivity);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Edit className="w-4 h-4 mr-2" />
        Edit Activity
      </Button>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <AddActivityForm 
          onSubmit={handleActivityUpdated} 
          onCancel={() => setOpen(false)}
          initialData={activity}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditActivityModal;
