import { table, getMinifiedRecords } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { id, name, neighborhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecord = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecord.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecord);

          res.json(records);
        } else {
          // crete a record

          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);

            res.json(records);
          } else {
            res.status(400);
            res.json({ message: 'Name is missing' });
          }
        }
      } else {
        res.status(400);
        res.json({ message: 'Id is missing' });
      }
    } catch (err) {
      console.error('Error creating or finding a store', err);
      res.status(500);
      res.json({ message: 'Error creating or finding a store', err });
    }
  }
};

export default createCoffeeStore;
