describe('test environment', () => {
  it('should work in NODE_ENV test', () => {
    expect(process.env.NODE_ENV).toEqual('test');
  });
});
