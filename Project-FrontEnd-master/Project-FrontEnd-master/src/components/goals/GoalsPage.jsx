import { useState, useEffect } from "react";
import GoalCard from "./shared/GoalCard";
import { NavLinks } from "./shared/NavLinks";
import ConfirmModal from "./shared/ConfirmModal";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

export default function GoalsPage() {
  const { session } = useAuth();

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const userId = session.id;

  // Fetch goals data from the backend API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get(`/goals?userId=${userId}`);
        setGoals(response.data); // Save fetched data to state
        console.log("Fetched goals:", response.data); // For debugging purposes
      } catch (error) {
        console.error("Error fetching goals:", error); // Handle error
      }
    };

    fetchGoals(); // Call the function to fetch goals
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      const goalId = goals[goalToDelete]._id;
      await api.delete(`/goals/${goalId}`);

      const updatedGoals = goals.filter((_, i) => i !== goalToDelete);
      setGoals(updatedGoals);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <>
      <NavLinks />

      <div className="mb-12 flex justify-between px-4 md:px-6">
        <div className="w-full">
          {goals.length > 0 ? (
            <h1 className="mb-10 mt-5 text-3xl font-bold">Your Goals</h1>
          ) : (
            <h1 className="mb-10 text-3xl font-bold">There are no goals</h1>
          )}

          <div className="flex w-full justify-center">
            <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-x-6 gap-y-12">
              {goals.map((goal, index) => (
                <GoalCard
                  key={index}
                  index={index}
                  goal={goal}
                  setShowModal={setShowModal}
                  setGoalToDelete={setGoalToDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        showModal={showModal}
        onConfirm={handleDelete} // Call handleDelete on confirmation
        onCancel={() => setShowModal(false)} // Close modal on cancel
      />
    </>
  );
}
