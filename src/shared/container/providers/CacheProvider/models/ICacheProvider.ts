export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;

  // O recovery recebe um argumento de tipo T e retorna o mesmo argumento ou nulo
  recover<T>(key: string): Promise<T | null>;

  invalidate(key: string): Promise<void>;

  // Invalidar um prefixo será invalidar todos os caches que começam com 'provider_list' por ex
  invalidatePrefix(prefix: string): Promise<void>;
}
