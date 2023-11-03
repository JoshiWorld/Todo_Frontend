import React, { useState } from 'react';
import { Button } from "src/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "src/ui/components/ui/dialog"
import { Input } from "src/ui/components/ui/input"
import { Label } from "src/ui/components/ui/label"

// @ts-ignore
function Edit({ show, onHide, item }) {
    const [editedItem, setEditedItem] = useState(item);

    // @ts-ignore
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const editedItemJSON = JSON.stringify(editedItem);

        fetch(`http://localhost:8080/api/todo/${editedItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: editedItemJSON,
        })
            .then((response) => {
                if (response.ok) {
                    onHide();
                } else {
                    console.error('Error sending data to the backend.');
                }
            })
            .catch((error) => {
                console.error('Error sending data to the backend:', error);
            });

        onHide();
    };

    // @ts-ignore
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditedItem({ ...editedItem, [name]: newValue });
    };

    return (
        <Dialog open={show} onOpenChange={onHide}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ToDo Bearbeiten</DialogTitle>
                    <DialogDescription>
                        Hier kannst du deine Aufgabe bearbeiten.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Titel
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={editedItem.title}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Beschreibung
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={editedItem.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="done" className="text-right">
                                Erledigt
                            </Label>
                            <Input
                                type="checkbox"
                                name="done"
                                value={editedItem.done}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Speichern</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Edit;
