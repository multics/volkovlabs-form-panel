import { FormElementType, PayloadMode } from '../constants';
import { GetPayloadForRequest, ToFormData, ToJSON } from './request';

describe('Request Utils', () => {
  const replaceVariables = jest.fn((str) => str);

  /**
   * Files
   */
  const image = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  const pdf = new File(['(⌐□_□)'], 'chucknorris.pdf', { type: 'application/pdf' });

  describe('GetPayloadForRequest', () => {
    const elements: any[] = [
      {
        id: 'name',
        type: FormElementType.STRING,
        value: 'John',
      },
      {
        id: 'age',
        type: FormElementType.NUMBER,
        value: 30,
      },
      {
        id: 'password',
        type: FormElementType.DISABLED,
        value: '123',
      },
    ];

    it('Should return values for all elements', () => {
      expect(
        GetPayloadForRequest({
          elements,
          initial: {},
          request: {
            payloadMode: PayloadMode.ALL,
          } as any,
        })
      ).toEqual({
        name: 'John',
        age: 30,
        password: '123',
      });
    });

    it('Should return values for updated elements', () => {
      expect(
        GetPayloadForRequest({
          elements,
          initial: {
            age: 30,
          },
          request: {
            payloadMode: PayloadMode.UPDATED,
          } as any,
        })
      ).toEqual({
        name: 'John',
      });
    });

    it('Should return values for updated elements with deprecated option', () => {
      expect(
        GetPayloadForRequest({
          elements,
          initial: {
            age: 30,
          },
          request: {
            updatedOnly: true,
          } as any,
        })
      ).toEqual({
        name: 'John',
      });
    });

    it('Should return values from getPayload execution', () => {
      expect(
        GetPayloadForRequest({
          elements,
          initial: {
            role: 'admin',
          },
          request: {
            payloadMode: PayloadMode.CUSTOM,
            getPayload: `
              return elements.reduce((acc, element) => ({
                ...acc,
                [element.id]: element.value
              }), initial)
              `,
          } as any,
        })
      ).toEqual({
        name: 'John',
        age: 30,
        password: '123',
        role: 'admin',
      });
    });
  });

  describe('To JSON', () => {
    it('Should work for array', async () => {
      const result = await ToJSON([1, 2, 3], replaceVariables);

      expect(result).toEqual(expect.any(String));
      expect(JSON.parse(result)).toEqual([1, 2, 3]);
    });
    it('Should read files', async () => {
      const payload = {
        name: 'Alex',
        list: [1, 2, 3],
        file: [image, pdf],
      };

      const result = await ToJSON(payload, replaceVariables);

      expect(result).toEqual(expect.any(String));
      expect(JSON.parse(result)).toEqual({
        ...payload,
        file: expect.arrayContaining([expect.any(String), expect.any(String)]),
      });
    });
  });

  describe('To FormData', () => {
    it('Should append array values', () => {
      const payload = {
        name: 'Alex',
        list: [1, 2, 3],
        file: [image, pdf],
      };

      const result = ToFormData(payload, replaceVariables);

      expect(result.get('name')).toEqual(payload.name);
      /**
       * Numbers array
       */
      expect(result.get('list[0]')).toEqual(payload.list[0].toString());
      expect(result.get('list[1]')).toEqual(payload.list[1].toString());

      /**
       * Files array
       */
      expect(result.get('file[0]')).toEqual(payload.file[0]);
      expect(result.get('file[1]')).toEqual(payload.file[1]);
    });
  });
});
