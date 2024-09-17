package MinMaxMetrics;

public class MinMaxMetrics {

    volatile long min;
    volatile long max;
    // Add all necessary member variables

    /**
     * Initializes all member variables
     */
    public MinMaxMetrics() {
        // Add code here
    }

    /**
     * Adds a new sample to our metrics.
     */
    public synchronized void addSample(long newSample) {
        this.min = Math.min(min, newSample);
        this.max = Math.max(max, newSample);
        // Add code here
    }

    /**
     * Returns the smallest sample we've seen so far.
     */
    public long getMin() {
        return min;
    }

    /**
     * Returns the biggest sample we've seen so far.
     */
    public long getMax() {
        return max;
    }
}
