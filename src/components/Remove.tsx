import React, { useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "src/ui/components/ui/alert-dialog";

// @ts-ignore
function Remove({ show, onHide, item }) {
    const handleRemoveClick = () => {
        fetch(`http://localhost:8080/api/todo/${item.id}`, {
            method: 'DELETE',
        }).then((response) => {
            if(response.ok) {
                onHide();
            }
        }).catch((error) => {
            console.error('Error deleting data:', error);
        });
    };

    return (
        <AlertDialog open={show} onOpenChange={onHide}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Willst du die ToDo wirklich löschen?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Wenn du diese ToDo löschst, dann kannst du dies nicht mehr rückgängig machen!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onHide}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemoveClick}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Remove;
