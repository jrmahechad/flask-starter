import { firebaseService } from '../../services/firebase';

/**
 * @fileoverview SampleDefault class.
 */
class SampleDefault {
  /**
   * Initializes SampleDefault class.
   */
  constructor() {
    console.log('SampleDefault!!!!');
    firebaseService.addDocument();
  }
}

export { SampleDefault };
