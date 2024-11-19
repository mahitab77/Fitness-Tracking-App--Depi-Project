import { Button } from "../../ui/button";

export default function ConfirmModal({ showModal, onConfirm, onCancel }) {
  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold dark:text-gray-600">
            Are you sure?
          </h2>
          <p className="mb-4 dark:text-gray-600">
            Do you really want to delete this goal? This action cannot be
            undone.
          </p>
          <div className="flex space-x-4">
            <Button type="button" onClick={onConfirm}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}