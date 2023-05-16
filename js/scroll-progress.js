class ScrollProgress {

    constructor(element) {
        this.element = element;

        this.__wasInRange = false;
        this.percentage = 0;

        this.onScroll = function(scroll_progress) {};

        this.bind();
    }

    bind() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        })

        document.addEventListener('DOMContentLoaded', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        this.calculateState();
        if (this.__isInRange || this.__wasInRange) {
            this.onScroll(this);
        }

        this.__wasInRange = this.__isInRange;
    }

    calculateState() {
        let current_pos = window.scrollY;
        let wrapper_from = this.element.offsetTop;
        let wrapper_to   = this.element.offsetTop + this.element.offsetHeight - window.innerHeight
        let wrapper_height=  wrapper_to - wrapper_from

        if (current_pos > wrapper_from && current_pos < wrapper_to) {
            this.__isInRange = true;
        } else {
            this.__isInRange = false;
        }

        this.__percentage = 100.0 / wrapper_height * (current_pos - wrapper_from) / 100.0;

        this.percentage = this.__percentage;
        if (this.__percentage < 0) this.percentage = 0.0;
        if (this.__percentage > 1) this.percentage = 1.0;
    }

    // returns the current index, based on the total index and the current percentage
    percentageToIndex(index_count) {
        let step_size = 100.0 / index_count / 100.0;

        let compare = 1.0 - step_size;
        let current_index = index_count - 1;

        while (compare > 0) {
            if (this.percentage >= compare) return current_index;

            compare -= step_size;
            current_index--;
        }

        return 0;
    }

}