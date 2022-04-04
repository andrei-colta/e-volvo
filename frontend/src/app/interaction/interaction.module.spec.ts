import { InteractionModule } from './interaction.module';

describe('InteractionModule', () => {
  let interactionModule: InteractionModule;

  beforeEach(() => {
    interactionModule = new InteractionModule();
  });

  it('should create an instance', () => {
    expect(interactionModule).toBeTruthy();
  });
});
