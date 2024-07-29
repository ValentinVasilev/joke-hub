"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoriesDropdown from "@/components/dropdowns/CategoriesDropdown/CategoriesDropdown";
import TextEditor from "@/components/text-editor/TextEditor";
import { useMutation } from "@tanstack/react-query";
import { jokeService } from "@/services/jokes/jokesService";
import { Loader2 } from "lucide-react";

const CreateJokeDialog = () => {
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Create Joke mutation
  const createJokeMutation = useMutation({
    mutationFn: jokeService.createJoke,
    onSuccess: () => {
      resetStateValues();
    },
  });

  // Handle execution of create joke
  function onSubmit() {
    createJokeMutation.mutate({
      text: text,
      category: category,
    });
  }

  // Reset state values
  function resetStateValues() {
    setText("");
    setCategory("");
  }

  // Handle Selected category
  function handleSetCategory(categoryValue: string) {
    setCategory(categoryValue);
  }

  // Handle Joke text
  function handleChangeText(
    textValue: string,
    delta: any,
    source: any,
    editor: any
  ) {
    // Lets make sure the editor is truely empty and there are no any tags left behind
    const isEditorEmpty = editor.getText().trim() === "";
    if (isEditorEmpty) {
      setText("");
    } else {
      setText(textValue);
    }
  }

  // Handle button based on the state
  function handleCreateButtonStatus() {
    if (!text?.length || !category?.length) return true;
    return false;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Joke</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Create Joke</DialogTitle>
          <DialogDescription>
            Make your joke from here. Click create joke when you are done.
          </DialogDescription>
          <div className="flex justify-end">
            <CategoriesDropdown setValue={handleSetCategory} value={category} />
          </div>
        </DialogHeader>
        <div className="my-5 min-h-28">
          <TextEditor type="edit" data={text} onChange={handleChangeText} />
        </div>
        <DialogFooter>
          {createJokeMutation.status === "pending" ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={handleCreateButtonStatus()}
              style={{ cursor: "pointer" }}
              onClick={onSubmit}
            >
              Create Joke
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJokeDialog;
