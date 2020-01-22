// Unit Tests

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '3.2kg';
      assert.equal(convertHandler.getNum(input), 3.2);   
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '23/8L';
      assert.equal(convertHandler.getNum(input), '23/8');
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '23.1/8L';
      assert.equal(convertHandler.getNum(input), 'invalid input');
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '2/2/3/3';
      assert.strictEqual(convertHandler.getNum(input), 'invalid input');
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'non_numerical_input';
      assert.strictEqual(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let input = '20' + ele;
        assert.equal(convertHandler.getUnit(input), ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const input = "29Gal";
      assert.equal(convertHandler.getUnit(input), 'invalid input');      
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['gallon', 'liter', 'mile', 'kilometer', 'pound', 'kilogram'];
      input.forEach(function(ele, i){ 
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [10, 'l'];
      const expected = 2.64172;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [165.3, 'mi'];
      const expected = 266.02390;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [54.4/2, 'km'];
      const expected = 16.90134;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [43.6, 'lbs'];
      const expected = 19.77663;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [12, 'kg'];
      const expected = 26.4555;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });
});


// Functional Tests 

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '32g' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 32);
            assert.equal(res.body.initUnit, 'invalid input');
            done();
          });
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 'invalid input');
          assert.equal(res.body.initUnit, 'kg');
          done();
        });
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({ input: '3/7.2/4kilomegagram' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 'invalid input');
            assert.equal(res.body.initUnit, 'invalid input');
            done();
          });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({ input: 'kg' })
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg')
          assert.approximately(res.body.returnNum, 2.20462, 0.1)
          assert.equal(res.body.returnUnit, 'lbs');
          done();
      });
      
    });

  });

});

});