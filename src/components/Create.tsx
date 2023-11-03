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
function Create({ show, onHide }) {
    const [createdItem, setCreatedItem] = useState({
        title: "",
        description: ""
    });

    // @ts-ignore
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const createdItemJSON = JSON.stringify(createdItem);

        fetch('http://localhost:8080/api/todo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: createdItemJSON,
        })
            .then(() => {
                onHide();
            })
            .catch((error) => {
                console.error('Error sending data to the backend:', error);
            });
    };

    // @ts-ignore
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        // @ts-ignore
        setCreatedItem({ ...createdItem, [name]: newValue });
    };

    return (
        <Dialog open={show} onOpenChange={onHide}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ToDo erstellen</DialogTitle>
                    <DialogDescription>
                        Hier kannst du eine ToDo erstellen.
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
                                value={createdItem.title}
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
                                value={createdItem.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Erstellen</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Create;
