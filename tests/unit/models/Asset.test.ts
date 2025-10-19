import { Asset } from '../../../src/models/Asset';
import { AssetType, CryptoType, MetalUnit } from '../../../src/models/types';

describe('Asset Model', () => {
  describe('Basic Asset Creation', () => {
    it('should create a basic cash asset', () => {
      const asset = new Asset({
        name: 'Checking Account',
        type: AssetType.CASH,
        value: 5000,
      });

      expect(asset.name).toBe('Checking Account');
      expect(asset.type).toBe(AssetType.CASH);
      expect(asset.value).toBe(5000);
      expect(asset.id).toBeDefined();
      expect(asset.createdAt).toBeInstanceOf(Date);
    });

    it('should create a high savings account asset', () => {
      const asset = new Asset({
        name: 'EQ Bank Savings',
        type: AssetType.HIGH_SAVINGS,
        value: 10000,
      });

      expect(asset.getValue()).toBe(10000);
      expect(asset.isCrypto()).toBe(false);
      expect(asset.isPreciousMetal()).toBe(false);
    });
  });

  describe('Crypto Asset', () => {
    it('should create a crypto asset and calculate value', () => {
      const asset = new Asset({
        name: 'Bitcoin Holdings',
        type: AssetType.CRO_CRYPTO,
        value: 0,
        cryptoDetails: {
          coinType: CryptoType.BTC,
          quantity: 0.5,
          pricePerCoin: 60000,
        },
      });

      expect(asset.getValue()).toBe(30000);
      expect(asset.isCrypto()).toBe(true);
      expect(asset.cryptoDetails?.coinType).toBe(CryptoType.BTC);
    });

    it('should recalculate value when crypto details update', () => {
      const asset = new Asset({
        name: 'Ethereum Holdings',
        type: AssetType.CRYPTO_LONG_TERM,
        value: 0,
        cryptoDetails: {
          coinType: CryptoType.ETH,
          quantity: 10,
          pricePerCoin: 3000,
        },
      });

      expect(asset.getValue()).toBe(30000);

      asset.update({
        cryptoDetails: {
          coinType: CryptoType.ETH,
          quantity: 10,
          pricePerCoin: 3500,
        },
      });

      expect(asset.getValue()).toBe(35000);
    });
  });

  describe('Precious Metal Asset', () => {
    it('should create a gold asset with grams', () => {
      const asset = new Asset({
        name: 'Gold Bars',
        type: AssetType.GOLD,
        value: 0,
        metalDetails: {
          unit: MetalUnit.GRAMS,
          weight: 100,
          pricePerUnit: 75,
        },
      });

      expect(asset.getValue()).toBe(7500);
      expect(asset.isPreciousMetal()).toBe(true);
    });

    it('should create a silver asset with ounces', () => {
      const asset = new Asset({
        name: 'Silver Coins',
        type: AssetType.SILVER,
        value: 0,
        metalDetails: {
          unit: MetalUnit.OUNCES,
          weight: 50,
          pricePerUnit: 25,
        },
      });

      expect(asset.getValue()).toBe(1250);
    });
  });

  describe('Asset Updates', () => {
    it('should update asset name and value', () => {
      const asset = new Asset({
        name: 'TFSA',
        type: AssetType.TFSA,
        value: 20000,
      });

      asset.update({
        name: 'TFSA - Updated',
        value: 25000,
      });

      expect(asset.name).toBe('TFSA - Updated');
      expect(asset.value).toBe(25000);
      expect(asset.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON and deserialize back', () => {
      const original = new Asset({
        name: 'Test Asset',
        type: AssetType.RRSP,
        value: 15000,
      });

      const json = original.toJSON();
      const deserialized = Asset.fromJSON(json);

      expect(deserialized.id).toBe(original.id);
      expect(deserialized.name).toBe(original.name);
      expect(deserialized.type).toBe(original.type);
      expect(deserialized.value).toBe(original.value);
    });
  });
});