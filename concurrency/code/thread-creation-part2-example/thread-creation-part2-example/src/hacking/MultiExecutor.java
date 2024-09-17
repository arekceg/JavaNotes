package hacking;

import java.util.List;


public class MultiExecutor {
    private final List<Runnable> tasks;


    // Add any necessary member variables here

    /*
     * @param tasks to executed concurrently
     */
    public MultiExecutor(List<Runnable> tasks) {
        // Complete your code here
        this.tasks = tasks;
    }

    /**
     * Starts and executes all the tasks concurrently
     */
    public void executeAll() {
        tasks.forEach(task -> new Thread(task).start());
    }
}
